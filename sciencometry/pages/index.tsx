import tw from "twin.macro";
import Link from "next/link";
import { useRouter } from "next/router";
import { animation, Button } from "styles/globals";
import { loginQuery } from "providers/login";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { hash } from "bcryptjs";
import { useRecoilState } from "recoil";
import { userAtom } from "atoms";
import { useQuery } from "@apollo/client";

export default function Login() {
	const router = useRouter();

	//SECTION States
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useRecoilState(userAtom);

	//SECTION Data Fetching
	const login = useQuery<LoginResponse>(loginQuery, { skip: true, variables: { username, password } });

	useEffect(() => {
		if (!login.error && !login.loading && login.called) {
			login.data?.users.nodes[0].id && setUser(login.data?.users.nodes[0].id);
		}
	}, [login, setUser]);

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-1 bg-gray-700">
			<div className="flex flex-col gap-1 py-24 bg-gray-100 rounded px-14">
				<p className="mb-4 text-3xl font-bold">Stylometry</p>
				<Input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
				<Input
					type="password"
					placeholder="Password"
					onChange={(event) => hash(event.target.value, 10, (err, hash) => setPassword(hash))}
				/>
				<Button className="w-full mt-2" onClick={() => router.push("/home")}>
					Login
				</Button>
				<p className="mt-4 text-xs font-light text-gray-900">
					Dont have an account?{" "}
					<Link href="/register" passHref>
						<Register>Create a new one!</Register>
					</Link>
				</p>
			</div>
		</div>
	);
}

const Input = styled.input(() => [tw`px-1 text-sm border border-gray-600 rounded py-0.5 font-light w-full`]);
const Register = styled.a(() => [tw`font-light underline cursor-pointer hover:text-teal-600`, animation]);
