;based on code by jNizM:
;GitHub - jNizM/Class_Monitor: Monitor Class (WinAPI)
;https://github.com/jNizM/Class_Monitor
;Class Monitor (Brightness, ColorTemperature) - AutoHotkey Community
;https://autohotkey.com/boards/viewtopic.php?f=6&t=7854

;e.g. f.lux on/off
;RGB: 129,69,5 ;e.g. f.lux on
;RGB: 129,129,129 ;e.g. f.lux off

q:: ;get brightness
VarSetCapacity(vData, 1536, 0)
hDC := DllCall("user32\GetDC", Ptr,0, Ptr)
DllCall("gdi32\GetDeviceGammaRamp", Ptr,hDC, Ptr,&vData)
vColR := NumGet(vData, 2, "UShort") - 128
vColG := NumGet(vData, 512+2, "UShort") - 128
vColB := NumGet(vData, 1024+2, "UShort") - 128
DllCall("user32\ReleaseDC", Ptr,0, Ptr,hDC)
MsgBox, % Format("RGB: {:i},{:i},{:i}", vColR, vColG, vColB) ;e.g. RGB: 127,127,125
MsgBox, % Format("red: {:i}`r`n" "green: {:i}`r`n" "blue: {:i}", vColR, vColG, vColB)
return

w:: ;set brightness
e:: ;set brightness (default values)
vColRGB := "1,1,1"
vColRGB := "32,32,32"
vColRGB := "64,64,64"
vColRGB := "128,128,128"
vColRGB := "255,255,255"
if InStr(A_ThisHotkey, "e")
  vColRGB := "127,127,125"
oArray := StrSplit(vColRGB, ",")
vColR := oArray.1+128, vColG := oArray.2+128, vColB := oArray.3+128, oArray := ""
VarSetCapacity(vData, 1536, 0)
Loop, % 1536 / 6
{
  vIndex := A_Index-1
  NumPut((vR := vColR*vIndex) > 65535 ? 65535 : vR, vData, 2*vIndex, "UShort")
  NumPut((vG := vColG*vIndex) > 65535 ? 65535 : vG, vData, 512 + 2*vIndex, "UShort")
  NumPut((vB := vColB*vIndex) > 65535 ? 65535 : vB, vData, 1024 + 2*vIndex, "UShort")
}
hDC := DllCall("user32\GetDC", Ptr,0, Ptr)
DllCall("gdi32\SetDeviceGammaRamp", Ptr,hDC, Ptr,&vData)
DllCall("user32\ReleaseDC", Ptr,0, Ptr,hDC)
return