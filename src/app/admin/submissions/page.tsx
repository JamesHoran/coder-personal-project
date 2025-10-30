'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  Code,
  TrendingUp,
  Filter,
  Download,
} from 'lucide-react';

interface Submission {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    totalXP: number;
    level: number;
  };
  lessonId: string;
  stepId: string;
  code: string;
  passed: boolean;
  testResults: any;
  attempts: number;
  xpEarned: number;
  language: string;
  submittedAt: string;
}

interface Stats {
  overview: {
    totalSubmissions: number;
    passedSubmissions: number;
    failedSubmissions: number;
    passRate: string;
    uniqueUsers: number;
    avgAttempts: string;
  };
  byLanguage: Array<{ language: string; count: number }>;
  recent: Array<any>;
}

export default function SubmissionsAdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filters, setFilters] = useState({
    lessonId: '',
    userId: '',
    passed: '',
    language: '',
  });
  const [pagination, setPagination] = useState({
    limit: 50,
    offset: 0,
    total: 0,
  });

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, [filters, pagination.offset]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString(),
        ...(filters.lessonId && { lessonId: filters.lessonId }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.passed && { passed: filters.passed }),
        ...(filters.language && { language: filters.language }),
      });

      const response = await fetch(`/api/admin/submissions?${params}`);
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data.submissions);
        setPagination((prev) => ({
          ...prev,
          total: data.data.pagination.total,
        }));
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/submissions/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: filters.lessonId || undefined,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Submission ID', 'User Email', 'User Name', 'Lesson ID', 'Step ID', 'Passed', 'Attempts', 'XP Earned', 'Language', 'Submitted At'],
      ...submissions.map((s) => [
        s.id,
        s.user.email,
        s.user.name,
        s.lessonId,
        s.stepId,
        s.passed.toString(),
        s.attempts.toString(),
        s.xpEarned.toString(),
        s.language,
        new Date(s.submittedAt).toISOString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lesson-submissions-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Lesson Submissions</h1>
          <p className="text-muted-foreground">
            View and analyze student submissions for interactive lessons
          </p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.overview.totalSubmissions}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pass Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.overview.passRate}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Unique Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.overview.uniqueUsers}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Attempts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.overview.avgAttempts}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Lesson ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., react-basics-01"
                  value={filters.lessonId}
                  onChange={(e) =>
                    setFilters({ ...filters, lessonId: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">User ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="User UUID"
                  value={filters.userId}
                  onChange={(e) =>
                    setFilters({ ...filters, userId: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={filters.passed}
                  onChange={(e) =>
                    setFilters({ ...filters, passed: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="true">Passed</option>
                  <option value="false">Failed</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Language</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={filters.language}
                  onChange={(e) =>
                    setFilters({ ...filters, language: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="typescript">TypeScript</option>
                  <option value="jsx">JSX</option>
                  <option value="tsx">TSX</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={fetchSubmissions} size="sm">
                Apply Filters
              </Button>
              <Button
                onClick={() => {
                  setFilters({ lessonId: '', userId: '', passed: '', language: '' });
                  setPagination({ ...pagination, offset: 0 });
                }}
                variant="outline"
                size="sm"
              >
                Clear
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm" className="ml-auto">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions ({pagination.total})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No submissions found
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{submission.user.name}</span>
                          <span className="text-sm text-muted-foreground">
                            ({submission.user.email})
                          </span>
                          <Badge variant="outline">
                            Level {submission.user.level}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Lesson:</span>
                            <div className="font-mono">{submission.lessonId}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Step:</span>
                            <div className="font-mono">{submission.stepId}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Language:</span>
                            <div>
                              <Badge variant="secondary">{submission.language}</Badge>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Attempts:</span>
                            <div className="font-semibold">{submission.attempts}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {submission.passed ? (
                          <Badge className="bg-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Passed
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      offset: Math.max(0, pagination.offset - pagination.limit),
                    })
                  }
                  disabled={pagination.offset === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing {pagination.offset + 1} to{' '}
                  {Math.min(pagination.offset + pagination.limit, pagination.total)} of{' '}
                  {pagination.total}
                </span>
                <Button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      offset: pagination.offset + pagination.limit,
                    })
                  }
                  disabled={pagination.offset + pagination.limit >= pagination.total}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Submission Modal */}
        {selectedSubmission && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSubmission(null)}
          >
            <Card
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Submission Details</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSubmission(null)}
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">User:</span>
                    <div className="font-medium">
                      {selectedSubmission.user.name} ({selectedSubmission.user.email})
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div>
                      {selectedSubmission.passed ? (
                        <Badge className="bg-green-600">Passed</Badge>
                      ) : (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lesson ID:</span>
                    <div className="font-mono">{selectedSubmission.lessonId}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Step ID:</span>
                    <div className="font-mono">{selectedSubmission.stepId}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attempts:</span>
                    <div className="font-semibold">{selectedSubmission.attempts}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">XP Earned:</span>
                    <div className="font-semibold">{selectedSubmission.xpEarned}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Submitted Code:</div>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{selectedSubmission.code}</code>
                  </pre>
                </div>

                {selectedSubmission.testResults && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Test Results:</div>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{JSON.stringify(selectedSubmission.testResults, null, 2)}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
