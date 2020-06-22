import { OncallDto } from 'src/app/services/Oncall_Dto';

export class dataModel {
    ID:String;
    Date: String;
    IA: String;
    IR_NO: String;
    Severity: number;
    Functional_Area: String;
    Reported_By: String;
    Problem_Reported: String;
    Root_Cause: String;
    Action_Resolution_Workaround: String;
    Long_Term_Solution_Needed: String;
    Redirected_teams: String;
    Time_hours: number;
    Team: String;


  public static fromDTO(onCallDto: OncallDto): dataModel {
    const DataModel = new dataModel();
    DataModel.ID = onCallDto._id;
    DataModel.Date = onCallDto.Date;
    DataModel.Team = onCallDto.Team;
    DataModel.Functional_Area = onCallDto.FunctionalArea;
    DataModel.IR_NO = onCallDto.IR;
    DataModel.Severity = Number(onCallDto.Severity);
    DataModel.Reported_By = onCallDto.ReportedBy;
    DataModel.Problem_Reported = onCallDto.ProblemReported;
    DataModel.IA = onCallDto.IA;
    DataModel.Root_Cause = onCallDto.RootCause;
    DataModel.Action_Resolution_Workaround = onCallDto.ActionResolutionWorkaround;
    DataModel.Long_Term_Solution_Needed=onCallDto.LongTermSolutionNeeded;
    DataModel.Redirected_teams = onCallDto.RedirectedtoOtherTeams;
    DataModel.Time_hours = Number(onCallDto.Timetakentoresolvetheproblem);
    return DataModel;
  }

  public toDTO():OncallDto {
    const Dto:OncallDto = {} as any;
    Dto._id = this.ID;
    Dto.Date = this.Date;
    Dto.Team = this.Team;
    Dto.FunctionalArea = this.Functional_Area;
    Dto.IR = this.IR_NO;
    Dto.Severity = this.Severity.toString();
    Dto.ReportedBy = this.Reported_By;
    Dto.ProblemReported = this.Problem_Reported;
    Dto.IA = this.IA;
    Dto.RootCause = this.Root_Cause;
    Dto.ActionResolutionWorkaround = this.Action_Resolution_Workaround;
    Dto.LongTermSolutionNeeded = this.Long_Term_Solution_Needed;
    Dto.RedirectedtoOtherTeams = this.Redirected_teams;
    Dto.Timetakentoresolvetheproblem = this.Time_hours.toString();
    return Dto;
  }

}
