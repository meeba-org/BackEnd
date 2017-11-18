import * as FileSaver from "file-saver";
import * as actions from "./actionTypes";

export const fetchMonthlyReportSuccess = (payload) => ({
    type: actions.FETCH_MONTHLY_REPORT_SUCCESS,
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
