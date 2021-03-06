import styled from "styled-components";
import tw from "twin.macro";

export const animation = tw`transition duration-300 ease-in-out`;

export const Button = styled.button`
	${animation}
	${tw`p-1 text-sm font-medium bg-teal-600 border border-transparent rounded cursor-pointer text-gray-50`}
	${tw`hover:bg-teal-700 active:bg-teal-800 focus:border-gray-50 focus:ring-1 focus:ring-teal-700`}
`;

export const focusRing = tw`focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-gray-50`;

export const GreenButton = styled.button`
	${animation}
	${focusRing}
	${tw`flex items-center px-4 py-1 text-base font-bold bg-teal-600 border border-transparent rounded text-gray-50`}
	${tw`focus:border-gray-50 hover:bg-opacity-70 focus:bg-opacity-90`}
`;

export const Input = styled.input(() => [
	animation,
	tw`px-2 text-sm border border-gray-200 rounded shadow-xl `,
	tw`focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`,
]);
