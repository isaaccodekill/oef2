import React, { RefObject } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils/css';
import { SelectProps, SelectItemProps } from '@/types'


const SelectDropdown =  ({ placeholder, label, options, value, onChange, disabled }: SelectProps) => (
    <Select.Root name={label} value={value} onValueChange={onChange} disabled={disabled}>
    
        <Select.Trigger
            className={cn("inline-flex w-full items-center justify-between border  rounded px-[20px] text-[14px] leading-none h-[40px] gap-[5px] bg-white", disabled && "bg-slate-200 cursor-not-allowed")}
            aria-label={label}
        >
            <Select.Value className={cn('text-[12px]', disabled && 'text-slate-200')} placeholder={placeholder} />
            <Select.Icon className="text-[#44639F]">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md border boder 1">
                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-[#44639F] cursor-default">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-[5px]">
                    <Select.Group>
                        <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                            {label}
                        </Select.Label>
                        {
                            options.map((option) => (
                            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </SelectItem>
                            ))
                        }
                    </Select.Group>

                    <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-[#39588F] cursor-default">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);

const SelectItem = React.forwardRef(({ children, className, ...props }:SelectItemProps, forwardedRef: React.LegacyRef<HTMLDivElement>) => {
    return (
        <Select.Item
            className={cn(
                'text-[12px] hover:text-white leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-grey-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#39588F] data-[highlighted]:text-[#fff]',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export default SelectDropdown;