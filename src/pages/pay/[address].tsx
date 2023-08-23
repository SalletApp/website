import React from "react";
import { useRouter } from "next/router";

import FullModal from "src/components/FullModal";
import Send from "src/components/FullModal/Send";

const Pay = () => {
  const router = useRouter();
  const address = router.query.address;
  console.log("🚀 ~ file: [address].tsx:11 ~ Pay ~ address:", address);
  return <Send onClose={() => null} address={address} />;
};

export default Pay;
