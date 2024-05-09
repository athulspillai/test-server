import Leadservey from "../models/leadservey.js";

const LeadserveyService = {
    AddLeadservey: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const leadservey = await Leadservey.create(details)
                resolve(leadservey)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },
    DeleteLeadservey: async (leadserveyid) => {
        try {
            const deleteLeadservey = await Leadservey.findOneAndDelete({ leadserveyid })

            if (!deleteLeadservey) {
                throw {
                    status: 404,
                    message: 'Leadservey not found.'
                }
            }
            return deleteLeadservey
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting Leadservey'
            }
        }
    },
    DeleteAllLeadserveys: async () => {
        try {
            await Leadservey.deleteMany({});
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting all Leadserveys'
            };
        }
    },

    UpdateLeadservey: async (leadserveyid, newCustName, newSince, newBizType, newBizCatge, newFName, newLName, newAddr1, newAddr2, newState, newCity, newArea, newPincode, newMobNum, newAltMobNum, newEmailId, newBizExp, newCurrAddSince, newBizHourFrom, newBizHourTo, newApproxQtyBuyinKg, newDaPurval, newKeyskus) => {
        try{
            const updateLeadservey = await Leadservey.findOneAndUpdate(
                { leadserveyid },
                { $set: { CustName:newCustName, Since:newSince, BizType:newBizType, BizCatge:newBizCatge, FName:newFName, LName:newLName, Addr1:newAddr1, Addr2:newAddr2, State:newState, City:newCity, Area:newArea, PinCode:newPincode, MobNum:newMobNum, AltMobNum:newAltMobNum, EmailId:newEmailId, BizExp:newBizExp, CurrAddSince:newCurrAddSince, BizHourFrom:newBizHourFrom, BizHourTo:newBizHourTo, ApproxQtyBuyinKg:newApproxQtyBuyinKg, DaPurVal:newDaPurval, KeySkus:newKeyskus}},
                { new: true }
            )
            if (!updateLeadservey) {
                throw { status: 404, message: 'Leadservey not found.'}
            }
            return updateLeadservey
        } catch (error) {
            throw{ status:500, message: 'Error while updating Leadservey'}
        }
    }
}

export default LeadserveyService