package cseon.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.jdbc.Work;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Table(name = "workbook")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Workbook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workbook_id")
    private int workbookId;

    @Column(name = "workbook_name", length = 50, nullable = false)
    private String workbookName;

    @Column(name = "workbook_createdBy", nullable = false)
    private Long workbookCreatedBy;

    @Column(name = "question_list")
    private String questionList;

    @Builder
    public Workbook(String workbookName, String questionList, Long workbookCreatedBy){
        this.questionList = questionList;
        this.workbookName = workbookName;
        this.workbookCreatedBy = workbookCreatedBy;
    }

    public void updateWorkbook(String workbookName, String questionList){
        this.questionList = questionList;
        this.workbookName = workbookName;
    }

}
