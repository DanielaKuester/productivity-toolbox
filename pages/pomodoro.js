export default function Pomodoro() {

    return(
        <>
            <title>Productivity Toolbox - Pomodoro</title>
            <meta name="description" content="The pomodoro timer balances work on the current task with breaks in between." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
                <h1 className="text-3xl p-8 font-bold text-white text-center">
                    Pomodoro Timer
                </h1>
                <div className="container flex mx-auto w-1/2 justify-center">
                    <p className="text-6xl font-bold text-white">30 : 00</p>
                </div>
            </div>
        </>
    )
}