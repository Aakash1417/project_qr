class StudyData {
    constructor({
        id,
        utilityOperation,
        workingDistance,
        incidentEnergy,
        arcFlashBoundary,
        shockHazard,
        limitedApproach,
        restrictedApproach,
        gloveClass,
        gloveVrating,
        equipment,
        analysisBy,
        date,
        standard,
        file,
    }) {
        this.id = id;
        this.utilityOperation = utilityOperation;
        this.workingDistance = workingDistance;
        this.incidentEnergy = incidentEnergy;
        this.arcFlashBoundary = arcFlashBoundary;
        this.shockHazard = shockHazard;
        this.limitedApproach = limitedApproach;
        this.restrictedApproach = restrictedApproach;
        this.gloveClass = gloveClass;
        this.gloveVrating = gloveVrating;
        this.equipment = equipment;
        this.analysisBy = analysisBy;
        this.date = date;
        this.standard = standard;
        this.file = file;
    }
}

module.exports = StudyData;
