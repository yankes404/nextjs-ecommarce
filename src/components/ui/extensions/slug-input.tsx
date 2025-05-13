import { Input } from "../input";

const transform = (value: string) => value
    .replaceAll(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()

function SlugInput ({ onChange, ...props }: React.ComponentProps<typeof Input>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        onChange?.({
            ...e,
            currentTarget: {
                ...e.currentTarget,
                value: transform(e.currentTarget.value)
            },
            target: {
                ...e.target,
                value: transform(e.target.value)
            }
        })
    }

    return (
        <Input
            onChange={handleChange}
            {...props}
        />
    )
}

export { SlugInput }