import ServicesClient from "../../../components/services/ServicesClient";

export const metadata = {
    title: "Solar EPC Services & Solutions | Divvy Solar",
    description: "Explore Divvy Solar's comprehensive range of residential, industrial, and utility-scale solar EPC services across India. Premium designs and bankable assets.",
    alternates: {
        canonical: "https://divvysolar.in/services",
    },
};

export default function ServicesPage() {
    return <ServicesClient />;
}
