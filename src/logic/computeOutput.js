export function computeOutput(answers) {
  let score = 0;

  if (answers.q1_tracking === 'Real-time, portfolio-wide') score += 3;
  else if (answers.q1_tracking === 'Badge or sensor data in some sites') score += 2;
  else if (answers.q1_tracking === 'Manual surveys / spot checks') score += 1;

  if (answers.q1_governance === 'Yes') score += 3;
  else if (answers.q1_governance === 'In progress') score += 1;

  if (answers.q2_ai_stage === 'Using it to optimize operations') score += 3;
  else if (answers.q2_ai_stage === 'Actively modeling it against the portfolio') score += 2;
  else if (answers.q2_ai_stage === 'Monitoring or analyzing it') score += 1;

  if (answers.q2_data_location === 'An integrated platform already') score += 3;
  else if (answers.q2_data_location === 'No single source of truth') score += 1;

  if (answers.q3_markets === 'Many markets and business lines') score += 2;
  else if (answers.q3_markets === 'Several markets') score += 1;

  let tier, title, summary, recommendations;

  if (score >= 12) {
    tier = 'Advanced';
    title = "You're ahead of the curve.";
    summary = 'Your portfolio operations show strong data maturity and technology adoption. The next frontier is predictive intelligence and full portfolio automation.';
    recommendations = [
      'Invest in AI-driven scenario modeling across your full portfolio.',
      'Standardize your data governance model across all markets.',
      'Explore dynamic lease restructuring tools to unlock further cost savings.',
    ];
  } else if (score >= 7) {
    tier = 'Developing';
    title = "You're building solid foundations.";
    summary = 'You have the right instincts but fragmented execution. Consolidation and a clearer data strategy will unlock your next step.';
    recommendations = [
      'Consolidate your real-estate data into a single source of truth.',
      'Pilot sensor-based utilization tracking in 2–3 sites before scaling.',
      'Define ownership of your data governance program within 90 days.',
    ];
  } else {
    tier = 'Early Stage';
    title = "There's significant opportunity ahead.";
    summary = 'Your portfolio decisions are largely reactive. The good news: even basic data infrastructure improvements will yield measurable results quickly.';
    recommendations = [
      'Start with a space audit across your top 5 locations.',
      'Move away from manual spreadsheet reporting — even a basic IWMS tool helps.',
      'Identify one internal owner for real-estate data quality.',
    ];
  }

  return { tier, title, summary, recommendations, score };
}
