import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { animation } from "styles/globals";
import tw from "twin.macro";

const MainLayout: FC = ({ children }) => {
	const router = useRouter();

	return router.asPath != "/" ? (
		<div className="flex h-screen">
			<div className="flex flex-col items-center flex-1 gap-4 px-4 py-12 bg-teal-600">
				<p className="text-2xl font-semibold text-gray-50">Stylometry</p>
				<PageButton onClick={() => router.push("/home")} active={router.asPath.includes("/home")}>
					Home
				</PageButton>
				<PageButton onClick={() => router.push("/projects")} active={router.asPath.includes("/projects")}>
					Projects
				</PageButton>
				<PageButton onClick={() => router.push("/grammar")} active={router.asPath.includes("/grammar")}>
					Grammar
				</PageButton>
			</div>
			<div className="p-12 flex-8">{children}</div>
		</div>
	) : (
		<div>{children}</div>
	);
};

export default MainLayout;

const PageButton = styled.button(({ active }: { active: boolean }) => [
	animation,
	tw`w-full py-1 rounded text-gray-50 hover:bg-gray-100 hover:text-teal-600`,
	active && tw`text-teal-600 bg-gray-50`,
]);
