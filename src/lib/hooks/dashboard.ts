import { useQuery } from "@tanstack/react-query"
import { dashboardKeys } from "../react-query/query-keys"
import http from "../utils/http";
import { DashboardData, TimeSeriesData } from "@/types";

export const useGetDashboardData = () => {

    const fetchDashboardData = async (): Promise<DashboardData> => {
        // Call your suggestion service here and pass the input as a parameter
        const response = await http.get(`/dashboard`);
        return response.data;
    };

    return useQuery({
        queryKey: dashboardKeys.text(),
        queryFn: fetchDashboardData,
    })
}


export const useGetAnalysisData = ({
    noYears
}: { noYears: number }) => {

    const fetchAnalysisData = async (): Promise<TimeSeriesData[]> => {
        // Call your suggestion service here and pass the input as a parameter
        const response = await http.get(`/dashboard/analysis?noYears=${noYears}`);
        return response.data;
    };

    return useQuery({
        queryKey: dashboardKeys.analysis(),
        queryFn: fetchAnalysisData,
    })
}