export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getRiskLevel = (files: any[]): 'low' | 'medium' | 'high' => {
  const criticalCount = files.filter(f => f.criticality === 'high').length;
  const sensitiveCount = files.filter(f => f.isSensitive).length;
  
  if (criticalCount > 2 || sensitiveCount > 3) return 'high';
  if (criticalCount > 0 || sensitiveCount > 1) return 'medium';
  return 'low';
};

export const getUniqueLanguages = (files: any[]): string[] => {
  const languages = new Set(files.map(f => f.language));
  return Array.from(languages).sort();
};