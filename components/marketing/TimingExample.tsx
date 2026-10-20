export default function TimingExample() {
  return (
    <figure className="timing-example">
      <figcaption>Worked example · use your ship’s own times</figcaption>
      <ol>
        <li>
          <span>Your all-aboard time</span>
          <strong>7:00 PM</strong>
        </li>
        <li>
          <span>Subtract a 60-minute buffer</span>
          <strong>
            6:00 PM <small>back at the pier</small>
          </strong>
        </li>
        <li>
          <span>Subtract a 30-minute ride</span>
          <strong>
            5:30 PM <small>leave by</small>
          </strong>
        </li>
      </ol>
      <p>
        These are example allowances, not a route estimate. Your ship’s official
        all-aboard time is final.
      </p>
    </figure>
  );
}
