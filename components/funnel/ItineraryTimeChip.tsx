interface ItineraryTimeChipProps {
  timeLabel: string;
}

export default function ItineraryTimeChip({ timeLabel }: ItineraryTimeChipProps) {
  return <span className="np-time-chip">{timeLabel}</span>;
}
