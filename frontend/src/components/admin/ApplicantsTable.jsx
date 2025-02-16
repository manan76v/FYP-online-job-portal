import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        toast.success(`Status updated to ${status}`);
    }

    return (
        <Table>
            <TableCaption>A list of recent job applicants</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applicants?.applications?.map((item) => (
                    <TableRow key={item._id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell>
                            <a 
                                href={item?.applicant?.profile?.resume} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-800 gap-1"
                            >
                                <FileText className="w-4 h-4" />
                                <span>{item?.applicant?.profile?.resumeOriginalName}</span>
                            </a>
                        </TableCell>
                        <TableCell>{new Date(item?.applicant.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                </PopoverTrigger>
                                <PopoverContent className="w-40">
                                    <div className="py-1">
                                        {shortlistingStatus.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => statusHandler(status, item._id)}
                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ApplicantsTable