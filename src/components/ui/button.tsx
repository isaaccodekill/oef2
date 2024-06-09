import Loader from "@/icons/loader.svg"
import { Text } from "./text"
import { cn } from "@/lib/utils/css"

const Button = ({ loading, text, className, onClick }: { loading: boolean, text: string, className?: string, onClick: () => any}) => {
    return (
        <button onClick={onClick} className={cn(className, "px-[15px] rounded-md h-10 gap-4 flex items-center justify-center  bg-[#0078CD] hover:bg-[#20A2FE] duration-300")}>
            {loading && <Loader className="animate-spin fill-white text-white" />}
            <Text className="!text-white" size="sm"> {text} </Text>
        </button>
    )
}

export default Button