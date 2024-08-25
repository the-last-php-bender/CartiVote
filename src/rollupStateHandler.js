const {toHex} =require('viem');
class rollupStateHandler {
    async handleReport(data, status, rollupServer =process.env.ROLLUP_HTTP_SERVER_URL) {
        let statusFallback = status ?? 'reject';
        const reportResponse = await fetch(`${rollupServer}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload: toHex(JSON.stringify(data)),
            }),
        });
        const reportResponseText = await reportResponse.text();
        console.log(reportResponse.status)
        if (reportResponse.status >= 400 && statusFallback === 'accept') {
            statusFallback = 'reject';
        }

        console.info(`Report generated with status: ${reportResponse.status}.`);
        console.info(`Report response: ${reportResponseText}`);
        console.info(`Report data: ${JSON.stringify(data)}`);

        return statusFallback;
    }
    async handleNotice(data) {
        try {
            const noticeRes = await fetch(`${process.env.ROLLUP_HTTP_SERVER_URL}/notice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payload: toHex(JSON.stringify(data)),
                }),
            });
            console.info(
                `Notice generated with status: ${noticeRes.status}.`
            );
            return 'accept';
        } catch (err) {
            return this.handleReport({
                notice:"Custom Notice",err
            });
        }
    }

}
module.exports= new rollupStateHandler()