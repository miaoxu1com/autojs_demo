TC配合
https://blog.51cto.com/u_15408625/6227211
https://blog.51cto.com/u_15408625/6223794
https://blog.51cto.com/u_15408625/6220699
https://blog.51cto.com/u_15408625/6223024
SetWorkingDir,%A_ScriptDir%

if NOT FileExist("TOTALCMD64.EXE")
{
	MsgBox 请把本脚本放到TOTALCMD64.EXE所在的目录中,再运行!
	ExitApp
}

If 0 < 1    ;0代表参数个数，该行表示不带参数；注意该处的 if 语句不可加括号
{
		
	full_command_line := DllCall("GetCommandLine", "str")
	if not (A_IsAdmin or RegExMatch(full_command_line, " /restart(?!\S)"))
	{
		try
		{
			if A_IsCompiled
				Run *RunAs "%A_ScriptFullPath%" /restart
			else
				Run *RunAs "%A_AhkPath%" /restart "%A_ScriptFullPath%"
		}
		ExitApp
	}
	;~ MsgBox A_IsAdmin: %A_IsAdmin%`nCommand line: %full_command_line%
	try{

		RegRead, IsExp, HKCR\Folder\shell\open\command, DelegateExecute

		If(IsExp="{11dbb47c-a525-400b-9e80-a54615a090c0}")
		{
			;需要清空DelegateExecute内容，注意不是删除DelegateExecute
			RegWrite, REG_SZ, HKCR\Folder\shell\open\command, DelegateExecute, 
			;RegWrite, REG_EXPAND_SZ, HKCR\Folder\shell\open\command, ,`"%A_WorkingDir%\TOTALCMD64.EXE`" /O /T /L= `"`%1`"
			RegWrite, REG_EXPAND_SZ, HKCR\Folder\shell\open\command, ,`"%A_AhkPath%`" `"%A_ScriptFullPath%`" `"`%1`"
			
			
			;右键菜单中增加OpenWithExplorer
			RegWrite, REG_SZ,HKCR\Folder\shell\OpenWithExplorer, MultiSelectModel, Document
			;~ RegWrite, REG_SZ,HKCR\Folder\shell\OpenWithExplorer\command, , `"%SystemRoot%\explorer.exe`" `"`%1`"
			RegWrite, REG_EXPAND_SZ,HKCR\Folder\shell\OpenWithExplorer\command, , `%SystemRoot`%\Explorer.exe `"`%1`"
			RegWrite, REG_SZ,HKCR\Folder\shell\OpenWithExplorer\command, DelegateExecute, {11dbb47c-a525-400b-9e80-a54615a090c0}
			
			TrayTip,,切换TotalCommader为默认文件管理器,2000
			Sleep ,1500
			
		}
		else
		{
			RegWrite, REG_SZ, HKCR\Folder\shell\open\command, DelegateExecute, {11dbb47c-a525-400b-9e80-a54615a090c0}
			RegWrite, REG_EXPAND_SZ, HKCR\Folder\shell\open\command, , `%SystemRoot`%\Explorer.exe
		
			RegDelete HKCR\Folder\shell\openwithExplorer
			
			TrayTip,,恢复Explorer为默认文件管理器,2000
			Sleep ,1500
		}

	}
	catch e{
		;~ ; 关于e对象的更多细节, 请参阅 Exception().
		MsgBox, 16,, % "Exception thrown!`n`nwhat: " e.what "`nfile: " e.file
		. "`nline: " e.line "`nmessage: " e.message "`nextra: " e.extra . A_LastError
		Exit
	}
}
else
{
	cm_OpenNewTab := 3001
	cm_OpenDirInNewTabOther := 3004
	
	WinGetClass, class, A
	
	
;---------------------------
/*
;~ explorer shell:::{17cd9488-1228-4b2f-88ce-4298e93e0966}  ;默认打开程序
firewall.cpl 

::{26EE0668-A00A-44D7-9371-BEB064C98683}\0\::{4026492F-2F69-46B8-B9BF-5654FC07E423}

*/
;---------------------------

param=%1%
If param not contains ::{,.tib
{
	Run %A_WorkingDir%\TOTALCMD64.EXE /O /T /A /P=R /R=`"%param%`"
}Else{
    ;~ Run % "Explorer.exe " . param
	Run % "explorer shell:" . param
	exitapp
}


	;标签去重并激活到目标目录

	
	;再重新在当前标签打开并定位文件（原因是TC默认是关闭了新开的重复标签，历史的文件定位信息丢失）
	Run %A_WorkingDir%\TOTALCMD64.EXE /O /A /P=R /R=`"%1%`"
	;TrayTip,%1% ,来自%class% `n 文件%file%
	;Sleep,5000
}


getFocused()
{
	ControlGet, SelectedItems, List, Focused, SysListView321, ahk_class EVERYTHING
	Loop, Parse, SelectedItems, `n  ; Rows are delimited by linefeeds (`n).
	{
		RowNumber := A_Index
		Loop, Parse, A_LoopField, %A_Tab%  ; Fields (columns) in each row are delimited by tabs (A_Tab).
		{
			;~ MsgBox Row #%RowNumber% Col #%A_Index% is %A_LoopField%.
			if(A_Index=1)
				file:=A_LoopField
			if InStr(A_LoopField,":\")
				dir:=A_LoopField
		}
		;~ return % dir . "\" . file
		return % file
	}
}
