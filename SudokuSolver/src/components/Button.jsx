import useTheme from "../contexts/theme"

function Button(){
    const {themeMode,lighttheme,darktheme}=useTheme()
    const onChangeBtn=(e)=>{
        const darkmodeStatus=e.currentTarget.checked
        if (darkmodeStatus){
            darktheme()
        }else lighttheme()
    }

    
    return(
        <>
       
       <label 
  htmlFor="AcceptConditions"
  className="relative inline-block h-6 min-w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-700"
>
  <input 
  value=""
  onChange={onChangeBtn}
  checked={themeMode==="dark"}

  type="checkbox" id="AcceptConditions" className="peer sr-only" />

  <span
    className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"
  ></span>
</label>
        </>
    )
}

export default Button