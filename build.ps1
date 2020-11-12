# Building Projects
Push-Location 'ITLab-Projects-Front'

npm run build

Pop-Location

# Building Front
Push-Location 'ITLab-Front'

npm run build
ls .\deploy\ITLab-Front\js | %{
    $fname=$_.ToString();
    $start = $fname.IndexOf("app");
    $end = $fname.IndexOf("js") + 2;
    if ($start -gt -1 -and $end -gt -1) {
        $fname.Substring($start, $end);
    }
} | Out-File ".\deploy\ITLab-Front\app.txt"

Pop-Location

# Building Single SPA
npm run build
