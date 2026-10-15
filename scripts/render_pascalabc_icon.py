from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


SCALE = 4
CANVAS = 1024
TILE = 496
GAP = 32
HI_TILE = TILE * SCALE
RADIUS = 62 * SCALE
FONT = r"C:\Windows\Fonts\arialbd.ttf"


def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=radius, fill=255
    )
    return mask


def vertical_gradient(top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    t = np.linspace(0.0, 1.0, HI_TILE, dtype=np.float32)[:, None, None]
    top_rgb = np.array(top, dtype=np.float32)[None, None, :]
    bottom_rgb = np.array(bottom, dtype=np.float32)[None, None, :]
    rgb = np.broadcast_to(top_rgb * (1.0 - t) + bottom_rgb * t, (HI_TILE, HI_TILE, 3))
    return Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB").convert("RGBA")


def fitted_font(text: str, max_width: int, max_height: int) -> ImageFont.FreeTypeFont:
    lo, hi = 1, max_height * 2
    while lo < hi:
        mid = (lo + hi + 1) // 2
        font = ImageFont.truetype(FONT, mid)
        box = font.getbbox(text)
        if box[2] - box[0] <= max_width and box[3] - box[1] <= max_height:
            lo = mid
        else:
            hi = mid - 1
    return ImageFont.truetype(FONT, lo)


def add_centered_text(
    tile: Image.Image,
    text: str,
    color: tuple[int, int, int, int],
    max_width: int,
    max_height: int,
    y_shift: int = 0,
) -> None:
    font = fitted_font(text, max_width * SCALE, max_height * SCALE)
    box = font.getbbox(text)
    width = box[2] - box[0]
    height = box[3] - box[1]
    x = (HI_TILE - width) // 2 - box[0]
    y = (HI_TILE - height) // 2 - box[1] + y_shift * SCALE

    shadow = Image.new("RGBA", tile.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).text(
        (x + 5 * SCALE, y + 7 * SCALE), text, font=font, fill=(0, 0, 0, 75)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(5 * SCALE))
    tile.alpha_composite(shadow)
    ImageDraw.Draw(tile).text((x, y), text, font=font, fill=color)


def make_tile(
    top: tuple[int, int, int],
    bottom: tuple[int, int, int],
    border: tuple[int, int, int, int],
    highlight: tuple[int, int, int, int],
    text: str,
    text_color: tuple[int, int, int, int],
    text_width: int,
    text_height: int,
    y_shift: int = 0,
) -> Image.Image:
    mask = rounded_mask(HI_TILE, RADIUS)
    tile = vertical_gradient(top, bottom)
    tile.putalpha(mask)

    bevel = Image.new("RGBA", tile.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(bevel)
    draw.rounded_rectangle(
        (2 * SCALE, 2 * SCALE, HI_TILE - 1 - 2 * SCALE, HI_TILE - 1 - 2 * SCALE),
        radius=RADIUS - 2 * SCALE,
        outline=border,
        width=3 * SCALE,
    )
    draw.rounded_rectangle(
        (10 * SCALE, 10 * SCALE, HI_TILE - 1 - 10 * SCALE, HI_TILE - 1 - 10 * SCALE),
        radius=RADIUS - 10 * SCALE,
        outline=highlight,
        width=5 * SCALE,
    )
    bevel.putalpha(Image.composite(bevel.getchannel("A"), Image.new("L", tile.size, 0), mask))
    tile.alpha_composite(bevel)

    add_centered_text(tile, text, text_color, text_width, text_height, y_shift)
    return tile.resize((TILE, TILE), Image.Resampling.LANCZOS)


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: render_pascalabc_icon.py OUTPUT.png")

    specs = [
        ((55, 110, 218), (3, 38, 137), (0, 24, 94, 255), (148, 194, 255, 175), "A", (255, 255, 255, 255), 330, 342, -1),
        ((45, 184, 79), (0, 119, 30), (0, 79, 18, 255), (151, 245, 169, 160), "B", (255, 255, 255, 255), 330, 342, -1),
        ((255, 54, 54), (207, 0, 0), (132, 0, 0, 255), (255, 171, 171, 175), "C", (255, 255, 255, 255), 326, 335, 1),
        ((250, 251, 253), (228, 230, 235), (151, 153, 161, 255), (255, 255, 255, 220), ".NET", (28, 58, 103, 255), 370, 150, 3),
    ]
    positions = [(0, 0), (TILE + GAP, 0), (0, TILE + GAP), (TILE + GAP, TILE + GAP)]
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    for spec, position in zip(specs, positions):
        canvas.alpha_composite(make_tile(*spec), position)

    output = Path(sys.argv[1])
    canvas.save(output, optimize=True)


if __name__ == "__main__":
    main()
