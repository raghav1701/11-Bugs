import { PrimaryLayout } from "@/components/layouts";
import { Navbar } from "@/components/pages/navbar";

import { TNextPageWithLayout } from "@/types";
import { Typography } from "@mui/material";
import { ReactElement } from "react";

const Home: TNextPageWithLayout = (): ReactElement => {
    return <Navbar />;
};

export default Home;
