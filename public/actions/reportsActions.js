import * as FileSaver from "file-saver";
import {GACategory} from "../helpers/GAService";
import * as actions from "./actionTypes";

export const fetchMonthlyReportSuccess = (payload) => ({
    type: actions.FETCH_MONTHLY_REPORT_SUCCESS,
    payload
});

export const fetchTasksReportSuccess = (payload) => ({
    type: actions.FETCH_TASKS_REPORT_SUCCESS,
    payload
});

export const generateExcelReport = (month, year) => ({
    type: actions.API,
    payload: {
        url: "/reports/download?year=" + year + "&month=" + month,
        method: "get",
        responseType: 'blob',
        success: (data)  => {
            let blob = new Blob([data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
            FileSaver.saveAs(blob, 'דוח ' + month + "-" + year + ".xlsx");
        },
    },
    meta: {
        shouldAuthenticate: true,
    },
    ga: {
        category: GACategory.DOWNLOAD_EXCEL,
    }
});

export const fetchMonthlyReport = (month, year) => ({
    type: actions.API,
    payload: {
        url: "/reports/monthly?year=" + year + "&month=" + month,
        method: "get",
        success: fetchMonthlyReportSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});

export const fetchTasksReport = (month, year) => ({
    type: actions.API,
    payload: {
        url: "/reports/tasks?year=" + year + "&month=" + month,
        method: "get",
        success: fetchTasksReportSuccess,
    },
    meta: {
        shouldAuthenticate: true,
    }
});
