import Image from "next/image"

export default function Pomodoro() {

    return(
        <>
            <title>Productivity Toolbox - Pomodoro</title>
            <meta name="description" content="The pomodoro timer balances work on the current task with breaks in between." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
                <h1 className="text-4xl p-8 font-bold text-white text-center">
                    Pomodoro Timer
                </h1>
                <div className="grid grid-cols-6 grid-rows-10 mx-auto sd:w-full xl:w-1/3">
                    <div className="bg-transparent min-h-[60px] border border-0 col-span-6 text-center justify-center text-8xl pt-1 p-3 mb-1 z-10">
                        <Image src={"Peeking-Cat.svg"} alt={"image of a peeping cat"} width={600} height={200}/>
                    </div>
                    <div className="bg-white min-h-[60px] border border-black col-span-6 text-center justify-center text-8xl pt-1 p-3 -mt-32 rounded-t-3xl">20:00</div>
                    <div className="bg-blue-100 min-h-[60px] border border-black border-t-0 col-span-6 justify-between">
                        <button className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40">Start/Pause</button>
                        <button className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40">Stop</button>
                        <button className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium text-2xl px-5 py-2 text-center h-12 m-3 ml-8 w-40">Reset</button>
                    </div>
                    <div className="bg-blue-200 min-h-[60px] border border-black border-t-0 col-span-3 border-r-0 rounded-bl-3xl text-xl pb-4">
                        <form>
                            <div className="m-3 ml-5 mt-4">
                                <label className="mr-1">Work (in min):</label>
                                <input type="number" min="1" max="180" className="float-right mr-2 w-24 border border-black"></input>
                            </div>
                            <div className="m-3 ml-5">
                                <label>Short Break (in min):</label>
                                <input type="number" min="1" max="180" className="float-right mr-2 w-24 border border-black"></input>
                            </div>
                            <div className="m-3 ml-5">
                                <label>Long Break (in min):</label>
                                <input type="number" min="1" max="180" className="float-right mr-2 w-24 border border-black"></input>
                            </div>
                            <button type="submit"
                                className="text-black bg-blue-300 hover:bg-blue-400 border border-black
                                focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                font-medium text-2xl px-5 py-2 ml-5 text-center h-12 m-3 w-40">
                                Set times
                            </button>
                        </form>
                    </div>
                    <div className="bg-blue-200 min-h-[60px] border border-black border-t-0 col-span-3 rounded-br-3xl p-3 text-xl">
                        <h2 className="mt-1 ml-2 underline">Current Task:</h2>
                        <p className="mt-1 ml-2">Find out how CSS Grid woks best and apply those experimental changes to my pomodoro timer.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}