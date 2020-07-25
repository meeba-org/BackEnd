import * as FileSaver from "file-saver";
import {EXCEL, MICHPAL} from "../../models/EReportFormat";
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

const generateFileName = (month, year, companySettings) => {
    switch (companySettings.defaultExportFormat) {
        case MICHPAL: {
            const monthStr = month.toString().padStart(2, '0');
            const yearStr = year.toString().substr(year.toString().length - 2);
            const michpalId = companySettings.michpalSettings.michpalId?.toString().padStart(3, '0');

            return `QVID${monthStr}${yearStr}.${michpalId}`;
        }
        case EXCEL:
            return `דוח-שעות-${month}-${year}.xlsx`;
    }
};

export const exportReport = (month, year, companySettings, format) => {
    const defaultExportFormat = format || companySettings.defaultExportFormat;
    const fileName = generateFileName(month, year, companySettings);

    return {
        type: actions.API,
        payload: {
            url: `/reports/download?year=${year}&month=${month}&format=${defaultExportFormat}`,
            method: "get",
            responseType: 'blob',

            success: (data)  => {
                let blob = new Blob([data], {type: data.type});
                FileSaver.saveAs(blob, fileName);
            },
        },
        meta: {
            shouldAuthenticate: true,
        },
        ga: {
            category: GACategory.DOWNLOAD_EXCEL,
            action: defaultExportFormat
        }
    };
};

export const fetchMonthlyReport = (month, year) => ({
    type: actions.API,
    payload: {
        url: `/reports/monthly?year=${year}&month=${month}`,
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
