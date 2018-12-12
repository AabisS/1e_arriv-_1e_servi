<#
Argument a faire passé
   $~/compareTextFiles.ps1 -inputFilePath $leftFile -compareFilePath $rightFile
#>

param(
    [Parameter(Mandatory=$true)]
    [System.IO.FileInfo]
    $inputFilePath,
    [Parameter(Mandatory=$true)]
    [System.IO.FileInfo]
    $compareFilePath

)
Do
{
node scrap_2e_commit.js

Sleep 10


$inputLines = Get-Content -Path $inputFilePath
$compareLines = Get-Content -Path $compareFilePath
$t = 0

for ($i=4; $i -lt $inputLines.count; $i++)
{
    #compare line against line
    if($inputLines[$i] -cne $compareLines[$i])
    {
        # efface les lignes blanches
        if($inputLines[$i].trim() -ne "" -and $compareLines[$i].trim() -ne "")
        {
            
            $matchingLeft = $inputLines[$i]
            $matchingRight = $compareLines[$i]
            
            # comparaison par caractere
            for ($j = 0; $j -lt $matchingLeft.Length; $j++)
            {
                capture la 1e diff et lancement service mail
                if($matchingLeft[$j] -cne $matchingRight[$j])
					{
						node .\mail_service.js
						$t = 1
						break
					}
            }
            
        }
    }
	
    
}

for ($k=4; $k -lt $inputLines.count; $k++)
{
	if($inputLines[$i] -eq $compareLines[$i])
    { 
	
		Write-Host "Tout est OK"
		break
	}
	
}
}
Until ($t -eq 1 ) #le mail est envoyé