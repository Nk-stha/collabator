import { StationView } from "@/components/dashboard/station-view";

export default async function VendorStationDetailPage({
  params,
}: {
  params: Promise<{ stationId: string }>;
}) {
  const { stationId } = await params;
  return <StationView role="vendor" stationId={stationId} />;
}
