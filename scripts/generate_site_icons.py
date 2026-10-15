from __future__ import annotations

import sys
import io
import struct
from pathlib import Path

from PIL import Image


SMALL_ICONS = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
}

PADDED_ICONS = {
    "favicon-120x120.png": 120,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
}

ICO_SIZES = (16, 20, 24, 32, 40, 48, 64, 128, 256)


def tightly_squared(source: Image.Image) -> Image.Image:
    source = source.convert("RGBA")
    alpha_box = source.getchannel("A").getbbox()
    if alpha_box is None:
        raise ValueError("The source image is fully transparent")

    cropped = source.crop(alpha_box)
    side = max(cropped.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.alpha_composite(
        cropped,
        ((side - cropped.width) // 2, (side - cropped.height) // 2),
    )
    return square


def resize_alpha_safe(source: Image.Image, size: int) -> Image.Image:
    # Resize premultiplied colour channels so transparent edge pixels cannot
    # introduce a light fringe on dark browser themes.
    return source.convert("RGBa").resize(
        (size, size), Image.Resampling.LANCZOS
    ).convert("RGBA")


def icon_layer(source: Image.Image, size: int) -> Image.Image:
    if size < 120:
        return resize_alpha_safe(source, size)

    margin = round(size * 0.14)
    content = resize_alpha_safe(source, size - 2 * margin)
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    layer.alpha_composite(content, (margin, margin))
    return layer


def write_png_compressed_ico(source: Image.Image, output: Path) -> None:
    payloads: list[bytes] = []
    for size in ICO_SIZES:
        buffer = io.BytesIO()
        icon_layer(source, size).save(buffer, format="PNG", optimize=True)
        payloads.append(buffer.getvalue())

    header_size = 6 + 16 * len(ICO_SIZES)
    offset = header_size
    entries = []
    for size, payload in zip(ICO_SIZES, payloads):
        dimension = 0 if size == 256 else size
        entries.append(
            struct.pack(
                "<BBBBHHII",
                dimension,
                dimension,
                0,
                0,
                1,
                32,
                len(payload),
                offset,
            )
        )
        offset += len(payload)

    output.write_bytes(
        struct.pack("<HHH", 0, 1, len(ICO_SIZES))
        + b"".join(entries)
        + b"".join(payloads)
    )


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: generate_site_icons.py SOURCE.png OUTPUT_DIR")

    source_path = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    output_dir.mkdir(parents=True, exist_ok=True)
    source = tightly_squared(Image.open(source_path))

    for filename, size in SMALL_ICONS.items():
        resize_alpha_safe(source, size).save(output_dir / filename, optimize=True)

    write_png_compressed_ico(source, output_dir / "favicon.ico")

    for filename, size in PADDED_ICONS.items():
        # The source's rounded outer corners need slightly more than 12% to
        # fit wholly inside an inscribed circular crop. Fourteen percent is
        # the first rounded value that keeps every alpha pixel inside it at
        # every requested output size.
        margin = round(size * 0.14)
        content_size = size - 2 * margin
        content = resize_alpha_safe(source, content_size)
        icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        icon.alpha_composite(content, (margin, margin))
        icon.save(output_dir / filename, optimize=True)

    for filename in (*SMALL_ICONS, *PADDED_ICONS):
        image = Image.open(output_dir / filename)
        print(f"{filename}: {image.mode} {image.width}x{image.height} bbox={image.getbbox()}")


if __name__ == "__main__":
    main()
