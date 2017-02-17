export class Course {

  constructor(
    public $key: string,
    public url: string,
    public description: string,
    public iconUrl: string,
    public courseListIcon: string,
    public longDescription: string
  ) { }

  static fromJson({$key, url, description, iconUrl, courseListIcon, longDescription}): Course {
    return new Course($key, url, description, iconUrl, courseListIcon, longDescription);
  }

  static fromJsonList(json: any[]): Course[] {
    return json.map(Course.fromJson);
  }

}
