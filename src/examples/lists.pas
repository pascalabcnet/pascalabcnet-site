// Все делители числа
function Divisors(n: integer): List<integer>;
begin
  Result := [];
  for var i := 1 to n do
    if n mod i = 0 then
      Result.Add(i)
end;

begin
  Divisors(24).Println
end.
