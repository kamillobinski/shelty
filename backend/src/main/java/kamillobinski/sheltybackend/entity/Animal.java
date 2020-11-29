package kamillobinski.sheltybackend.entity;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;

@Entity
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 45 ,name = "name")
    private String name;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "dateOfBirth")
    @Temporal(TemporalType.DATE)
    // @TemporalType is used to store date in this column
    private Date dateOfBirth;

    @Column(name = "age")
    private int age;

    @ManyToOne
    @JoinColumn(name = "sizeId")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "coatLengthId")
    private CoatLength coatLength;

    @ManyToOne
    @JoinColumn(name = "breedId")
    private Breed breed;

    @ManyToOne
    @JoinColumn(name = "genderId")
    private Gender gender;

    @Column(name = "color")
    private String color;

    @Column(name = "dateArrivedInShelter")
    @Temporal(TemporalType.DATE)
    // @TemporalType is used to store date in this column
    private Date dateArrivedInShelter;

    @Column(name = "dateAdopted")
    @Temporal(TemporalType.DATE)
    // @TemporalType is used to store date in this column
    private Date dateAdopted;

    @Column(name = "identichip")
    private BigInteger identichip;

    @ManyToOne
    @JoinColumn(name = "houseTrainedId")
    private HouseTrained houseTrained;

    @Column(name = "isReady", nullable = false, columnDefinition = "tinyint default false")
    private Boolean isReady = false;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public CoatLength getCoatLength() {
        return coatLength;
    }

    public void setCoatLength(CoatLength coatLength) {
        this.coatLength = coatLength;
    }

    public Breed getBreed() {
        return breed;
    }

    public void setBreed(Breed breed) {
        this.breed = breed;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Date getDateArrivedInShelter() {
        return dateArrivedInShelter;
    }

    public void setDateArrivedInShelter(Date dateArrivedInShelter) {
        this.dateArrivedInShelter = dateArrivedInShelter;
    }

    public Date getDateAdopted() {
        return dateAdopted;
    }

    public void setDateAdopted(Date dateAdopted) {
        this.dateAdopted = dateAdopted;
    }

    public BigInteger getIdentichip() {
        return identichip;
    }

    public void setIdentichip(BigInteger identichip) {
        this.identichip = identichip;
    }

    public HouseTrained getHouseTrained() {
        return houseTrained;
    }

    public void setHouseTrained(HouseTrained houseTrained) {
        this.houseTrained = houseTrained;
    }

    public Boolean getReady() {
        return isReady;
    }

    public void setReady(Boolean ready) {
        isReady = ready;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
