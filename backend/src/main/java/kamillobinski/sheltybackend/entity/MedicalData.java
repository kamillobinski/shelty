package kamillobinski.sheltybackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
public class MedicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicalDataId", unique = true, nullable = false)
    private int id;

    @Column(name = "graftingDate")
    @Temporal(TemporalType.DATE)
    private Date graftingDate;

    @Column(name = "dewormingDate")
    @Temporal(TemporalType.DATE)
    private Date dewormingDate;

    @Column(name = "steilizationDate")
    @Temporal(TemporalType.DATE)
    private Date sterilizationDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "animalId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Animal animal;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getGraftingDate() {
        return graftingDate;
    }

    public void setGraftingDate(Date graftingDate) {
        this.graftingDate = graftingDate;
    }

    public Date getDewormingDate() {
        return dewormingDate;
    }

    public void setDewormingDate(Date dewormingDate) {
        this.dewormingDate = dewormingDate;
    }

    public Date getSterilizationDate() {
        return sterilizationDate;
    }

    public void setSterilizationDate(Date sterilizationDate) {
        this.sterilizationDate = sterilizationDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
