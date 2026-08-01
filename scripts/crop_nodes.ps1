Add-Type -AssemblyName System.Drawing;
$imgPath = 'c:\Users\Mega Pc\.gemini\antigravity\scratch\Mahdi 3d portfolio\public\projects\samsung\nodes\samsung_geonodes_and_shader_trees.png';
$src = [System.Drawing.Bitmap]::FromFile($imgPath);

# 1. Crop GeoNodes Tree (Top Window without Blender header bar)
$rectGeo = New-Object System.Drawing.Rectangle(0, 32, $src.Width, 275);
$cropGeo = $src.Clone($rectGeo, $src.PixelFormat);
$cropGeo.Save('c:\Users\Mega Pc\.gemini\antigravity\scratch\Mahdi 3d portfolio\public\projects\samsung\nodes\samsung_geonodes_tree.png', [System.Drawing.Imaging.ImageFormat]::Png);
$cropGeo.Dispose();

# 2. Crop Shader Tree (Bottom Window without middle Blender header bar)
$rectShader = New-Object System.Drawing.Rectangle(0, 345, $src.Width, 275);
$cropShader = $src.Clone($rectShader, $src.PixelFormat);
$cropShader.Save('c:\Users\Mega Pc\.gemini\antigravity\scratch\Mahdi 3d portfolio\public\projects\samsung\nodes\samsung_shader_tree.png', [System.Drawing.Imaging.ImageFormat]::Png);
$cropShader.Dispose();

$src.Dispose();
Write-Host "Node trees cropped successfully!";
