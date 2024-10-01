export interface AuditRef {
  id: string;
  numericValue: number;
  title: string;
  displayValue?: string; // Optional, as it may not exist in some audits
}

export interface LighthouseReport {
  categories: {
    performance: {
      auditRefs: AuditRef[];
    };
  };
  audits: Record<string, { title: string; numericValue: number; displayValue?: string }>; // Updated
}
