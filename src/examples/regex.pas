// Сколько перестановок слова ОДЕКОЛОН
// не содержат одинаковых соседних букв?
##
'ОДЕКОЛОН'
  .Permutations
  .Where(s -> not s.IsMatch('(.)\1'))
  .Distinct
  .Count
  .Print
