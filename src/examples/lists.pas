function Divisors(n: integer): List<integer>;
begin
  Result := [];
  for var i := 1 to n do
    if n mod i = 0 then
      Result.Add(i)
end;

begin
  Divisors(24).Println
  // 1 2 3 4 6 8 12 24
end.
