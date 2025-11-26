#Region ;**** Directives created by AutoIt3Wrapper_GUI ****
#AutoIt3Wrapper_Icon=nuitkaui.ico
#AutoIt3Wrapper_UseUpx=y
#AutoIt3Wrapper_UseX64=n
#EndRegion ;**** Directives created by AutoIt3Wrapper_GUI ****
#Include <File.au3>
;~ 在程序中调用另外一个程序
#pragma compile(AutoItExecuteAllowed, true)

;~ 目录不能和要执行的进程的名字nuitkaui.exe同名
Local $sDirectory = "D:\scoop\apps\pyrepack"
If Not FileExists($sDirectory) Then
    MsgBox(0x0, "Error", "The directory does not exist.")
    Exit
EndIf
FileChangeDir($sDirectory)
RunWait("nuitkaui.exe")