# ln.ps1 ln.txt

$lines = Get-Content $args[0]
for ($i = 0; $i -lt $lines.Count; $i++) {
  $link = $lines[$i]
  # Empty line is likly the end of file
  if (!$link) { break }
  $target = $lines[++$i]
  if (Test-Path $target) {
    New-Item -ItemType Junction -Path $link -Value $target *> $null
  } else {
    Write-Warning "Target does not exist: $target"
  }
}
