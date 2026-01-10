import { StationView } from "@/components/dashboard/station-view";

export default async function FranchiseStationDetailPage({
  params,
}: {
  params: Promise<{ stationId: string }>;
}) {
  const { stationId } = await params;
  return <StationView role="franchise" stationId={stationId} />;
}
