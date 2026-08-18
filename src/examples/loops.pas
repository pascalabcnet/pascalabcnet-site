begin
  var a := [12,73,25,48,9,41,36,80];

  for var i := 0 to a.Length-1 step 2 do
    if a[i] in 10..50 then
      Print(a[i])
end.
