import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import { Profile } from "./index";

const profilMockeData = {
  firstName: "Siim",
  age: 35,
  image: "https://robohash.org/hicveldicta.png",
};

const meta = {
  component: Profile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MockedSuccess: Story = {
  parameters: {
    msw: [
      rest.get("https://dummyjson.com/users/1", (_req, res, ctx) => {
        return res(ctx.json(profilMockeData));
      }),
    ],
  },
};
