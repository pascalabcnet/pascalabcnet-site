##
function HasEqualAdjacentChars(s: string) :=
  s.IsMatch('(.)\1');

'LETTER'
  .Permutations
  .Where(s -> not HasEqualAdjacentChars(s))
  .Distinct
  .Count
  .Print // → 84