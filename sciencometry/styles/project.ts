import styled from "styled-components";
import tw from "twin.macro";
import { animation } from "./globals";

export const Upload = styled.label(() => [
	animation,
	tw`relative flex items-center justify-center w-64 font-bold bg-gray-200 border rounded-sm cursor-pointer h-9`,
	tw`hover:bg-gray-300`,
]);
