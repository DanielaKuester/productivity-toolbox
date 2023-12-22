import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
		<Head>
			<title>The Productivity Toolbox</title>
			<meta name="description" content="Generated by create next app" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className="min-h-screen pb-10 bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
			<div>
				<h1 className="text-3xl p-8 font-bold text-black text-center">
					Boost Your Results with Your Personal Productivity Toolbox
				</h1>
				<Image src={"human-sized-todos.svg"} alt={"image of a peeping cat"} width={700} height={700} className="mx-auto"/>
				<p className="text-center -mt-5">
					{/* Free vector graphic from freepic.com: https://www.freepik.com/free-vector/personal-goals-checklist-concept-illustration_28766054.htm */}
					<a href="https://www.freepik.com/free-vector/personal-goals-checklist-concept-illustration_28766054.htm">
						Image by storyset
					</a> on Freepik
				</p>
				<div className="mt-5">
					<p className="text-center">
						<Link href="/todos">My To Do List</Link>
					</p>
					<p className="text-center">
						<Link href="/diary">Progress Diary</Link>
					</p>
					<p className="text-center">
						<Link href="/pomodoro">Pomodoro Timer</Link>
					</p>
				</div>
			</div>
		</main>
    </>
  )
}
