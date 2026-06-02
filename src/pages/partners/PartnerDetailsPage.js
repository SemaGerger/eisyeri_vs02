import React from "react";
import { useParams } from "react-router-dom";
import { usePartner } from "../../hooks/UsePartner";

import Layout from "../../layouts/Layout";
import ParnerDetailsCard from "../../components/pageCards/ParnerDetailsCard";
import StatusMessage from "../../components/status/StatusMessage";


const PartnerDetailsPage = () => {
  const { id } = useParams();
  const { partner, loading, error } = usePartner(id);



  return (
    <Layout>
      <div className="py-12 px-6  mt-16">
      <ParnerDetailsCard partner={partner} loading={loading} error={error} />
      </div>
    </Layout>
  );
};

export default PartnerDetailsPage;
