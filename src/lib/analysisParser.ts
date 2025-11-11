export interface ParsedAnalysis {
  summary: string;
  detailedAnalysis: string;
  hasDetailedAnalysis: boolean;
}

export function parseAnalysisContent(fullAnalysis: string): ParsedAnalysis {
  if (!fullAnalysis || fullAnalysis.trim() === '') {
    return {
      summary: '',
      detailedAnalysis: '',
      hasDetailedAnalysis: false,
    };
  }

  const separator = '---';
  const parts = fullAnalysis.split(separator);

  if (parts.length < 2) {
    return {
      summary: fullAnalysis,
      detailedAnalysis: '',
      hasDetailedAnalysis: false,
    };
  }

  const summary = parts[0].trim();
  const detailedAnalysis = parts.slice(1).join(separator).trim();

  return {
    summary,
    detailedAnalysis,
    hasDetailedAnalysis: detailedAnalysis.length > 0,
  };
}
