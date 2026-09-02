begin
  var a := [8,2,9,4,2,6,7,4];

  a.Where(x -> x mod 2 = 0) // 8 2 4 2 6 4
    .Distinct               // 8 2 4 6
    .Order                  // 2 4 6 8
    .Select(x -> x*x)       // 4 16 36 64
    .Println                 
end.
