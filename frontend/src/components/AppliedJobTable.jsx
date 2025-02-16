import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    if (!Array.isArray(allAppliedJobs)) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <Card className="p-6">
                    <div className="text-center text-gray-500">Loading applications...</div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Applied Jobs</h1>
                    <Badge variant="outline">
                        Total Applications: {allAppliedJobs.length}
                    </Badge>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Job Role</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allAppliedJobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-gray-500">You haven't applied to any jobs yet</p>
                                            <p className="text-sm text-gray-400">
                                                Start applying to jobs to see them listed here
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                allAppliedJobs.map((appliedJob) => (
                                    <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                                        <TableCell>
                                            {new Date(appliedJob?.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {appliedJob.job?.title}
                                        </TableCell>
                                        <TableCell>
                                            {appliedJob.job?.company?.name}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge className={
                                                appliedJob?.status === "rejected" 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : appliedJob?.status === "accepted"
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }>
                                                {appliedJob?.status?.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {allAppliedJobs.length > 0 && (
                    <div className="mt-4 text-sm text-gray-500 text-right">
                        Showing {allAppliedJobs.length} application{allAppliedJobs.length !== 1 ? 's' : ''}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AppliedJobTable;