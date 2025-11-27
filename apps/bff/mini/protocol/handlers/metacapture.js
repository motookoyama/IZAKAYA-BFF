/**
 * Handler for MetaCapture 2.0 Satellite App.
 * @param {object} payload - { mode, content, auto }
 * @param {object} context - { db, logger, userId, consumePointsFromUser }
 */
module.exports = async function handleMetaCapture(payload, { logger, userId, consumePointsFromUser }) {
    const { mode, content, auto } = payload;

    logger.info(`[MetaCapture] Request from ${userId}: mode=${mode}`);

    // 1. Consume Points (50 pts)
    const COST = 50;
    const SKU = 'metacapture_v2_launch';

    // Note: consumePointsFromUser should throw if insufficient balance
    const { balance } = await consumePointsFromUser(userId, COST, SKU);

    // 2. Generate URL
    const baseUrl = 'https://metacapture-2-0-95139013565.us-west1.run.app';
    const params = new URLSearchParams();
    if (mode) params.append('mode', mode);
    if (content) params.append('content', content);
    if (auto) params.append('auto', 'true');

    const generatedUrl = `${baseUrl}?${params.toString()}`;

    logger.info(`[MetaCapture] Generated URL for ${userId}: ${generatedUrl}`);

    return {
        success: true,
        app: 'metacapture',
        payload: {
            url: generatedUrl,
            cost: COST,
            balance: balance
        },
        relay: true
    };
};
